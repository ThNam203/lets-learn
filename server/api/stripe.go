package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net"
	"net/http"
	"os"

	"github.com/stripe/stripe-go/v80"
	"github.com/stripe/stripe-go/v80/paymentintent"
	"github.com/stripe/stripe-go/v80/webhook"
)

func (a *api) CreateStripePaymentIntentHandler(w http.ResponseWriter, r *http.Request) {
	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(9999),
		Currency: stripe.String(string(stripe.CurrencyUSD)),
		AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
			Enabled: stripe.Bool(true),
		},
	}

	pi, err := paymentintent.New(params)
	if err != nil {
		if stripeErr, ok := err.(*stripe.Error); ok {
			a.errorResponse(w, http.StatusBadRequest, stripeErr)
			return
		} else {
			a.errorResponse(w, http.StatusInternalServerError, err)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(struct {
		ClientSecret string `json:"clientSecret"`
	}{
		ClientSecret: pi.ClientSecret,
	})
}

func (a *api) StripeWebhookHandler(w http.ResponseWriter, r *http.Request) {
	//err := IsIPAllowed(r.RemoteAddr)
	//if err != nil {
	//	a.errorResponse(w, http.StatusBadRequest, err)
	//	return
	//}

	stripeWebhookSecret := os.Getenv("STRIPE_WEBHOOK_SECRET")
	signatureHeader := r.Header.Get("Stripe-Signature")

	const MaxBodyBytes = int64(65536)
	r.Body = http.MaxBytesReader(w, r.Body, MaxBodyBytes)

	body, err := io.ReadAll(r.Body)
	if err != nil {
		a.errorResponse(w, http.StatusServiceUnavailable, errors.New(fmt.Sprintf("Error reading request body: %v\n", err)))
		return
	}

	event, err := webhook.ConstructEvent(body, signatureHeader, stripeWebhookSecret)
	if err != nil {
		a.errorResponse(w, http.StatusBadRequest, errors.New(fmt.Sprintf("Error verifying webhook signature: %v\n", err)))
		return
	}

	if event.Type == "checkout.session.completed" {
		fmt.Println("Checkout Session completed!")
	}

	w.WriteHeader(http.StatusNoContent)
}

var allowedStripeIPs = [...]string{
	"3.18.12.63",
	"3.130.192.231",
	"13.235.14.237",
	"13.235.122.149",
	"18.211.135.69",
	"35.154.171.200",
	"52.15.183.38",
	"54.88.130.119",
	"54.88.130.237",
	"54.187.174.169",
	"54.187.205.235",
	"54.187.216.72",
	"::1",
}

func IsIPAllowed(remoteAddr string) error {
	host, _, err := net.SplitHostPort(remoteAddr)
	if err != nil {
		return err
	}

	ip := net.ParseIP(host)
	if ip == nil {
		return errors.New("ip not found")
	}

	isAllowed := false
	for _, allowedIP := range allowedStripeIPs {
		if ip.String() == allowedIP {
			isAllowed = true
			break
		}
	}

	if !isAllowed {
		return errors.New("ip not allowed")
	}

	return nil
}
