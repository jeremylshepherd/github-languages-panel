import React, { PureComponent, ReactNode } from 'react'
import getObjectTotals from '../helpers/getObjectTotals'
import sortObject from '../helpers/sortObject'
import { RepoProps, RepoState, RepoLanguage } from '../types'
import Card from './Card'
import ProgressBar from './ProgressBar'

class Repos extends PureComponent<RepoProps, RepoState> {
    constructor(props: RepoProps) {
        super(props)

        this.state = {
            avatar: './person-generic.jpg',
            repos: [],
            repoLanguages: [],
            languageSet: {},
            totalBytes: 0,
            loading: true
        }

        this.getRepos = this.getRepos.bind(this);
        this.getLanguage = this.getLanguage.bind(this);
        this.getRepoLanguages = this.getRepoLanguages.bind(this);
        this.setLanguages = this.setLanguages.bind(this);
        this.processData = this.processData.bind(this);
        this.getTotalBytes = this.getTotalBytes.bind(this);
    }

    async getRepos() : Promise<any> {
        const { REACT_APP_URL_BASE : url, REACT_APP_URL_OPTIONS : options, REACT_APP_PAT : pat } = process.env;
        const {username} = this.props;
        let response = await fetch(`${url}${username}${options}`, { headers: { authorization: `token ${pat}`}});
        let data = await response.json();
        let { avatar_url } : { avatar_url: string } = data[0].owner;
        this.setState({ avatar: avatar_url });
        let minData = data.map((r : any) => {
            let { name, languages_url } = r;
            return { name, languages_url };
        });
        this.setState({ repos: minData });
    }

    async getLanguage(url: string) : Promise<RepoLanguage> {
        const { REACT_APP_PAT : pat } = process.env;
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
        let languageSet = getObjectTotals({}, this.state.repoLanguages);
        let totalBytes = this.getTotalBytes(languageSet);
        languageSet = sortObject(languageSet);
        this.setState({ languageSet, totalBytes });
    }

    async processData() {
        await this.getRepos();
        await this.getRepoLanguages();
        this.setLanguages();
        this.setState({ loading: false });
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

    componentDidUpdate(prevProps: any) {
        if(prevProps.username !== this.props.username) {
            this.setState({ loading:  true, avatar: './person-generic.jpg' });
            this.processData();
        }
    }

    render(): ReactNode {
        let copy = {...this.state.languageSet};
        let keys = Object.keys(copy);
        const {avatar, loading, totalBytes: total} = this.state;
        const { username, width } = this.props;
        return (
            <Card width={width}>
               <span className="card-header">
                    <img src={avatar} className="round" alt="user avatar"/>
                    <h2>{` ${username ?? 'User'}'s`} Github Languages Profile</h2>
               </span>
                {
                    loading ?
                    <span className="spinner-container">
                        <i className="fas fa-spinner fa-spin fa-7x"/> 
                    </span>:
                    keys.map(k => <ProgressBar key={k} width={width * .75} percentage={copy[k]/total} label={k} bytes={copy[k]}/>)
                }
            </Card>
        )
    }
}

export default Repos
