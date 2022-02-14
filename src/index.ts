// import * as core from '@actions/core'
// import * as exec from '@actions/exec'
import { context, getOctokit } from '@actions/github';
// import * as glob from '@actions/glob'
// import * as io from '@actions/io'

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command({
    command: 'delete',
    handler: async () => {
      console.log('delete all!');
      const github = getOctokit(process.env['GITHUB_TOKEN'] || '');

      // github.rest.repos
      //   .listForUser({
      //     username: context.repo.owner,
      //   })
      //   .then((response) => {
      //     console.log('listForUser', response.data.length);
      //     // response.data.map((item) => {
      //     //   console.log(item.private);
      //     // });
      //   });

      // github.rest.search
      //   .repos({
      //     q: `user:${context.repo.owner}`,
      //   })
      //   .then((response) => {
      //     console.log('search', response.data.total_count);
      //   });

      const iterator = github.paginate.iterator(github.rest.repos.listForUser, {
        username: context.repo.owner,
        per_page: 100,
      });

      // iterate through each response
      for await (const { data } of iterator) {
        console.log(data.length);
      }
    },
  })
  .parse();
