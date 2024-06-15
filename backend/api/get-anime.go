package api

import (
	"backend/turso"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAnime(c *gin.Context) {
	anilistId := c.Param("uuid")

	fmt.Println(anilistId)

	schema, err := turso.GetAnime(anilistId)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": fmt.Sprintf("Bad request. %s", err),
		})
		return
	}

	c.JSON(http.StatusOK, schema)
}
