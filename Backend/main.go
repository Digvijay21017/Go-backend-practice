package main

import (
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "github.com/go-resty/resty/v2"
    "net/http"
)

func main() {
    r := gin.Default()

    // Enable CORS for all origins
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"}, // Allow frontend origin
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
        AllowCredentials: true,
    }))

    // API to fetch games
    r.GET("/api/games", func(c *gin.Context) {
        client := resty.New()
        resp, err := client.R().Get("https://www.freetogame.com/api/games")

        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch data"})
            return
        }

        c.Data(http.StatusOK, "application/json", resp.Body())
    })

    // Start the server on port 8080
    r.Run(":8080")
}
