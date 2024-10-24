package domain

import "github.com/gofrs/uuid/v5"

type Course struct {
	ID          uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Title       string    `json:"title" gorm:"not null"`
	Description *string   `json:"description" gorm:"type:text"`
	ImageUrl    *string   `json:"imageURL" gorm:"type:text"`
	Price       *float64  `json:"price" gorm:"default:null"`
	Category    *string   `json:"category" gorm:"type:text"`
	Level       *string   `json:"level" gorm:"type:text"`
	IsPublished bool      `gorm:"not null;default:false"`

	Students  []User `gorm:"many2many:user_courses"`
	Sections  []Section
	Resources []AttachedFile
}

type CourseRepository interface {
	Create(*Course) error
}
