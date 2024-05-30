import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

function SearchRoutes(app) {

    const searchRepos = async (req, res) => {
        const { username } = req.params;
        let totalRepo = [];
        let page = 1;

        try {
            let response = await axios.get(
                `https://api.github.com/users/${username}/repos`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page,
                        per_page: 80,
                    },
                }
            );

            while (response.data.length > 0) {
                totalRepo = [...totalRepo, ...response.data];
                page++;

                response = await axios.get(
                    `https://api.github.com/users/${username}/repos`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            page,
                            per_page: 80,
                        },
                    }
                );
            }
            res.json(totalRepo);

        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching data');
        }
    };

    const getRepoCounts = async (req, res) => {
        const { username } = req.params;
        let totalRepo = [];
        let page = 1;

        try {
            let response = await axios.get(
                `https://api.github.com/users/${username}/repos`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page,
                        per_page: 80,
                    },
                }
            );

            while (response.data.length > 0) {
                totalRepo = [...totalRepo, ...response.data];
                page++;

                response = await axios.get(
                    `https://api.github.com/users/${username}/repos`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            page,
                            per_page: 80,
                        },
                    }
                );
            }
            const repo_count = totalRepo.length;
            res.json(repo_count);

        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching data');
        }
    };

    const getTotalForkCount = async (req, res) => {
        const { username } = req.params;
        let totalForkCounts = 0;
        let page = 1;
    
        try {
            let response = await axios.get(
                `https://api.github.com/users/${username}/repos`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page,
                        per_page: 80,
                    },
                }
            );
    
            while (response.data.length > 0) {
                for (const repo of response.data) {
                    if (repo.fork === true) {
                        totalForkCounts++;
                    }
                }
                page++;
    
                response = await axios.get(
                    `https://api.github.com/users/${username}/repos`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            page,
                            per_page: 80,
                        },
                    }
                );
            }
            res.json(totalForkCounts);
    
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching data');
        }
    };
    
    const getUsedLanguagesCount = async (req, res) => {
        const { username } = req.params;
        const languageCounts = {};
        let page = 1;
    
        try {
            let response = await axios.get(
                `https://api.github.com/users/${username}/repos`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page,
                        per_page: 80, // Adjust per_page as needed
                    },
                }
            );
    
            while (response.data.length > 0) {
                for (const repo of response.data) {
                    const language = repo.language;
                    if (language) {
                        if (!languageCounts.hasOwnProperty(language)) {
                            languageCounts[language] = 1;
                        } else {
                            languageCounts[language]++;
                        }
                    }
                }
                page++;
    
                response = await axios.get(
                    `https://api.github.com/users/${username}/repos`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            page,
                            per_page: 80,
                        },
                    }
                );
            }
    
            const languageLists = Object.entries(languageCounts).sort((a, b) => b[1] - a[1]);
            const result = languageLists.map(([language, _]) => language);
    
            res.json(result);
    
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching data');
        }
    }
    

    app.get("/api/users/:username/repos", searchRepos);
    app.get("/api/users/:username/repoCount", getRepoCounts);
    app.get("/api/users/:username/getTotalForkCount", getTotalForkCount);
    app.get("/api/users/:username/getUsedLanguagesCount", getUsedLanguagesCount);

}

export default SearchRoutes;