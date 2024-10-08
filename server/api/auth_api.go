package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/sen1or/lets-learn/domain"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/gofrs/uuid/v5"
	"golang.org/x/crypto/bcrypt"
)

type userLogInForm struct {
	Email    string `validate:"required,email"`
	Password string `validate:"required,gte=8,lte=72"`
}

type signUpForm struct {
	Username  string `validate:"required,gte=6,lte=50"`
	Email     string `validate:"required,email"`
	Password  string `validate:"required,gte=8,lte=72"`
	IsTeacher bool   `validate:"required"`
}

func (a *api) LogInHandler(w http.ResponseWriter, r *http.Request) {
	var userCredentials userLogInForm
	if err := json.NewDecoder(r.Body).Decode(&userCredentials); err != nil {
		a.errorResponse(w, http.StatusBadRequest, err)
		return
	}

	validate := validator.New(validator.WithRequiredStructEnabled())
	err := validate.Struct(&userCredentials)
	if err != nil {
		a.errorResponse(w, http.StatusBadRequest, err)
		return
	}

	user, err := a.userRepo.GetByEmail(userCredentials.Email)
	if err != nil {
		a.errorResponse(w, http.StatusBadRequest, err)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(userCredentials.Password)); err != nil {
		a.errorResponse(w, http.StatusUnauthorized, errors.New("username or password is not correct!"))
		return
	}

	// TODO: sync the expires date of refresh token in database with client
	refreshToken, accessToken, err := a.refreshTokenRepo.GenerateTokenPair(user.ID)
	if err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	a.setTokens(w, refreshToken, accessToken)

	w.WriteHeader(http.StatusOK)
}

func (a *api) SignUpHandler(w http.ResponseWriter, r *http.Request) {
	var userForm signUpForm
	json.NewDecoder(r.Body).Decode(&userForm)

	log.Printf("user: %v", userForm)

	validate := validator.New(validator.WithRequiredStructEnabled())
	err := validate.Struct(&userForm)
	if err != nil {
		a.errorResponse(w, http.StatusBadRequest, err)
		return
	}

	uuid, err := uuid.NewGen().NewV4()
	if err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userForm.Password), bcrypt.DefaultCost)

	if err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	user := &domain.User{
		ID:           uuid,
		Username:     userForm.Username,
		Email:        userForm.Email,
		PasswordHash: string(hashedPassword),
		IsTeacher:    userForm.IsTeacher,
	}

	if err := a.userRepo.Create(*user); err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	go a.sendConfirmEmail(user.ID, user.Email)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(*user)
}

func (a *api) verifyEmailHandler(w http.ResponseWriter, r *http.Request) {
	var token = r.URL.Query().Get("token")

	var verifyToken domain.VerifyToken
	result := a.db.Unscoped().First(&verifyToken, "token = ?", token)

	if result.Error != nil {
		a.errorResponse(w, http.StatusBadRequest, result.Error)
		return
	}

	user, err := a.userRepo.GetByID(verifyToken.UserID)
	if err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	} else if user.IsVerified {
		w.Write([]byte("Your email has already been verified!"))
		w.WriteHeader(http.StatusOK)
		return
	}

	if verifyToken.ExpiresAt.Before(time.Now()) {
		a.errorResponse(w, http.StatusBadRequest, fmt.Errorf("verify token expired: %s", verifyToken.ExpiresAt.Local().String()))
		return
	}

	updateVerifiedUser := &domain.User{
		ID:         user.ID,
		IsVerified: true,
	}

	if err := a.userRepo.Update(*updateVerifiedUser); err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	a.verifyTokenRepo.DeleteToken(verifyToken.ID)
	w.Write([]byte("Email verification complete!"))
	w.WriteHeader(http.StatusOK)
}

func (a *api) sendConfirmEmail(userId uuid.UUID, userEmail string) {
	verifyToken, err := a.verifyTokenRepo.CreateToken(userId)
	if err != nil {
		log.Printf("error while trying to create verify token: %s", err.Error())
		return
	}

	smtpServer := "smtp.gmail.com:587"
	smtpUser := "letsliveglobal@gmail.com"
	smtpPassword := os.Getenv("GMAIL_APP_PASSWORD")

	from := "letsliveglobal@gmail.com"
	to := []string{userEmail}
	subject := "Lets Live Email Confirmation"
	body := `<!DOCTYPE html>
<html>
<head>
    <title>` + subject + `</title>
</head>
<body>
    <p>This is a test email with a clickable link.</p>
	<p>Click <a href="https://localhost:8000/v1/auth/verify?token=` + verifyToken.Token + `">here</a> to confirm your email.</p>
</body>
</html>`

	msg := "From: " + from + "\n" +
		"To: " + userEmail + "\n" +
		"Subject: " + subject + "\n" +
		"Content-Type: text/html; charset=\"UTF-8\"\n\n" +
		body

	auth := smtp.PlainAuth("", smtpUser, smtpPassword, "smtp.gmail.com")

	err = smtp.SendMail(smtpServer, auth, from, to, []byte(msg))
	if err != nil {
		log.Printf("failed trying to send confirmation email: %s", err.Error())
	}
}
