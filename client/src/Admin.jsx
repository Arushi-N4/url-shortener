import { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/urls');
                setUrls(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load URLs');
                setLoading(false);
            }
        };
        fetchUrls();
    }, []);

    if (loading) return <div>Loading...</div>;



    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Short URL</th>
                        <th>Original URL</th>
                        <th>Clicks</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map((url) => (
                        <tr key={url._id}>
                            <td>
                                <a
                                    href={`http://localhost:5000/${url.short_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {url.short_url}
                                </a>
                            </td>
                            <td>
                                <a href={url.original_url} target="_blank" rel="noopener noreferrer">
                                    {url.original_url.length > 50 ? `${url.original_url.substring(0, 50)}...` : url.original_url}
                                </a>
                            </td>
                            <td>{url.clicks}</td>
                            <td>{new Date(url.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;