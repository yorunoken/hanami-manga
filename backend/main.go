package main

import (
	gg "backend/api"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	api := router.Group("/api")
	{
		api.GET("/greet/:name", gg.Greet)

		api.GET("/manga", gg.GetManga)
		api.GET("/manga/:uuid", gg.GetManga)
		api.GET("/chapter", gg.GetChapter)
		api.GET("/chapter/:uuid", gg.GetChapter)

		api.GET("/at-home/server/:uuid", gg.HomeServer)
	}

	router.Run(":8080")
}
