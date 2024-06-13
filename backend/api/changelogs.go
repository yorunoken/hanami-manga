package api

import (
	"backend/database"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func Changelogs(c *gin.Context) {
	table := "changelogs"

	result, err := database.FetchAllFromTable(table)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": result})
}

func AddChangelog(c *gin.Context) {
	params := c.Request.URL.Query()
	type ChangelogEntry struct {
		ID           uint   `json:"id"`
		Version      string `json:"version"`
		Date         string `json:"date"`
		Features     string `json:"features,omitempty"`
		Bugs         string `json:"bugs,omitempty"`
		Enhancements string `json:"enhancements,omitempty"`
	}

	var entry ChangelogEntry
	if err := c.BindJSON(&entry); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if params.Get("token") != os.Getenv("access_token") {
		return
	}

	query := fmt.Sprintf("INSERT INTO changelogs (id, version, date, features, bugs, enhancements) VALUES (%d, '%s', '%s', '%s', '%s', '%s')",
		entry.ID, entry.Version, entry.Date, entry.Features, entry.Bugs, entry.Enhancements)

	if err := database.Exec(query); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Changelog entry added successfully", "entry": entry})
}
