package api

import (
	"backend/utils"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetChapter(c *gin.Context) {
	url := "https://api.mangadex.org/chapter"

	uuid := c.Param("uuid")
	params := c.Request.URL.Query()

	if uuid != "" {
		url = url + "/" + uuid
	}

	url = url + "?" + params.Encode()

	data, err := utils.GETJson(url)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": fmt.Sprintf("Bad request. %s", err),
		})
		return
	}

	c.JSON(http.StatusOK, data)
}
