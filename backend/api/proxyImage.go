package api

import (
	"backend/utils"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ProxyImage(c *gin.Context) {
	url := c.Request.URL.Query().Get("url")
	headers := map[string]string{
		"referrer": "https://mangadex.org",
	}

	image, err := utils.GETImage(url, headers)

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": fmt.Sprintf("Bad request. %s", err),
		})
		return
	}
	c.Header("Content-Type", "image/jpeg")

	c.Writer.Write(image)
}
