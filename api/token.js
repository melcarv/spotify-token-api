export default async function handler(req, res) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const authBuffer = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${authBuffer}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ grant_type: 'client_credentials' }),
    });

    if (!response.ok) {
        return res.status(500).json({ error: 'Erro ao obter token do Spotify' });
    }

    const data = await response.json();
    return res.status(200).json(data);
}