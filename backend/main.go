package main

import (
	gg "backend/api"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	config := cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://meow:5173", "https://manga.yorunoken.com"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}

	router.Use(cors.New(config))

	api := router.Group("/api")
	{
		api.GET("/greet/:name", gg.Greet)
		api.GET("/proxy-image", gg.ProxyImage)

		api.GET("/manga", gg.GetManga)
		api.GET("/manga/:uuid", gg.GetManga)
		api.GET("/manga/:uuid/aggregate", gg.MangaAggregate)

		api.GET("/chapter", gg.GetChapter)
		api.GET("/chapter/:uuid", gg.GetChapter)

		api.GET("/at-home/server/:uuid", gg.HomeServer)
	}

	router.Run(":8080")
}
