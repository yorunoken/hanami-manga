package turso

import (
	"database/sql"
	"os"

	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

type MikanimeIdentifier struct {
	AnilistID     int
	Identifier    string
	Title         string
	CoverImage    string
	OtherNames    string
	DubIdentifier string
}

func GetAnime(anilistId string) ([]MikanimeIdentifier, error) {
	url := os.Getenv("TURSO_DATABASE_URL") + "?authToken=" + os.Getenv("TURSO_AUTH_TOKEN")

	db, err := sql.Open("libsql", url)

	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query("SELECT anilist_id, identifier, title, cover_image, other_names, dub_identifier FROM mikanime_identifiers WHERE anilist_id = ?", anilistId)

	if err != nil {
		return nil, err
	}

	var identifiers []MikanimeIdentifier

	for rows.Next() {
		var id MikanimeIdentifier
		err := rows.Scan(&id.AnilistID, &id.Identifier, &id.Title, &id.CoverImage, &id.OtherNames, &id.DubIdentifier)
		if err != nil {
			return nil, err
		}
		identifiers = append(identifiers, id)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return identifiers, err
}
