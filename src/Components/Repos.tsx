import React, { Component, ReactNode } from 'react'
import getObjectTotals from '../helpers/getObjectTotals'
import sortObject from '../helpers/sortObject'
import { RepoProps, RepoState, Repo, RepoLanguage } from '../types'
import Card from './Card'
import ProgressBar from './ProgressBar'

class Repos extends Component<RepoProps, RepoState> {
    constructor(props: RepoProps) {
        super(props)

        this.state = {
            owner: '',
            avatar: '',
            repos: [],
            repoLanguages: [],
            languageSet: {},
            total: 0
        }

        this.getRepos = this.getRepos.bind(this);
        this.getLanguage = this.getLanguage.bind(this);
        this.getRepoLanguages = this.getRepoLanguages.bind(this);
        this.setLanguages = this.setLanguages.bind(this);
        this.processData = this.processData.bind(this);
        this.getTotalBytes = this.getTotalBytes.bind(this);
    }

    async getRepos() : Promise<any> {
        const { url, pat } = this.props;
        let response = await fetch(url, { headers: { authorization: `token ${pat}`}});
        let data = await response.json();
        let { login, avatar_url } : { login: string, avatar_url: string } = data[0].owner;
        this.setState({ owner: login, avatar: avatar_url });
        let minData = data.map((r : any) => {
            let { name, languages_url } = r;
            return { name, languages_url };
        });
        this.setState({ repos: minData });
    }

    async getLanguage(url: string) : Promise<RepoLanguage> {
        const { pat } = this.props;
        let response = await fetch(url, { headers: { authorization: `token ${pat}`}});
        let data = await response.json();
        return data;
    }

    async getRepoLanguages() {
        let languagesData = [];
         for(let i = 0; i < this.state.repos.length; i++) {
            let r = this.state.repos[i];
            let languageSet = await this.getLanguage(r.languages_url);
            languagesData.push(languageSet);
        }
        this.setState({ repoLanguages: languagesData });
    }

    setLanguages() {
        let combined = getObjectTotals({}, this.state.repoLanguages);
        let totalBytes = this.getTotalBytes(combined);
        combined = sortObject(combined);
        this.setState({ languageSet: combined, total: totalBytes });
    }

    async processData() {
        await this.getRepos();
        await this.getRepoLanguages();
        this.setLanguages();
    }

    getTotalBytes(obj: RepoLanguage) : number {
        let keys = Object.keys(obj);
        let num = 0;
        for(let i = 0; i < keys.length; i++)
            num += obj[keys[i]];
        return num;
    }

    componentDidMount() {
        this.processData();
    }

    render(): ReactNode {
        let copy = {...this.state.languageSet};
        let keys = Object.keys(copy);
        let { total, owner, avatar } = this.state;
        return (
           <Card>
               <span className="card-header">
                    <img src={avatar} className="round" alt="user avatar"/>
                    <h2>{`${owner}'s`} Github Languages Profile</h2>
               </span>
                {
                    keys.map(k => <ProgressBar key={k} width={440} percentage={copy[k]/total} label={k} bytes={copy[k]}/>)
                }
            </Card>
        )
    }
}

export default Repos
