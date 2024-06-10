package utils

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func GETJson(url string, headers ...map[string]string) (any, error) {
	client := &http.Client{}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	if len(headers) > 0 {
		for key, value := range headers[0] {
			fmt.Println(key, value)
			req.Header.Set(key, value)
		}
	}

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var manga any
	err = json.Unmarshal(body, &manga)
	if err != nil {
		return nil, err
	}

	return &manga, nil
}

func GETImage(url string, headers ...map[string]string) ([]byte, error) {
	client := &http.Client{}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	if len(headers) > 0 {
		for key, value := range headers[0] {
			fmt.Println(key, value)
			req.Header.Set(key, value)
		}
	}

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	return body, nil
}
