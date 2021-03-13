export interface RepoProps {
    url: string,
    pat: string
}
export interface RepoState {
    owner: string,
    repos: Repo[],
    avatar: string,
    repoLanguages: RepoLanguage[],
    languageSet: RepoLanguage,
    total: number
}

export type Repo = {
    name: string,
    languages_url: string
};

export type RepoLanguage = {
    [key: string]: number
};