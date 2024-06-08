package utils

import (
	"encoding/json"
	"io"
	"net/http"
)

func GET(url string) (any, error) {
	client := &http.Client{}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
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
