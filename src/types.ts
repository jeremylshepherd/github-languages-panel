export interface RepoProps {
    username: string,
    width: number
}
export interface RepoState {
    repos: Repo[],
    avatar: string,
    repoLanguages: RepoLanguage[],
    languageSet: RepoLanguage,
    totalBytes: number,
    loading: boolean
}

export type Repo = {
    name: string,
    languages_url: string
};

export type RepoLanguage = {
    [key: string]: number
};