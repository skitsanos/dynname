#!/usr/bin/env node

const meta = require('./package');
const program = require('commander');
const fs = require('fs');
const path = require('path');
const request = require('request');

class Application
{
    constructor()
    {
        const configFile = path.join(__dirname, 'config.json');
        if (!fs.existsSync(configFile))
        {
            console.error(`config.json is not found in ${__dirname}`);
            process.exit(1);
        }
        else
        {
            this.config = require('./config');
        }
    }

    run()
    {
        program
            .version(`${meta.version}`, '-v, --version')
            .usage('-hostname')
            .option('-host, --hostname <hostname>', 'hostname')
            .parse(process.argv);

        if (!program.hostname)
        {
            console.log('Missing hostname');
            return;
        }

        const url = 'https://' + this.config.username + ':' + this.config.token + '@api.name.com/v4/domains/' + this.config.domain;

        request.get('http://api.skitsanos.com/getip', (e, r, b) =>
        {
            let res = JSON.parse(b);
            let ip = res.result;

            console.log(`Setting ${program.hostname}.${this.config.domain} to ${ip}...`);

            request.get(url + '/records', (error, response, body) =>
                {
                    let doc = JSON.parse(body);

                    if (!doc.records.some(element => element.host === program.hostname))
                    {
                        //create hostname
                        request.post(url + '/records', {
                            json: {
                                host: program.hostname,
                                type: 'A',
                                answer: ip,
                                ttl: 300
                            }
                        }, (e, r, b) =>
                        {
                            if (b.answer === ip)
                            {
                                console.log('Host has been updated');
                            }
                            else
                            {
                                console.log('Failed to update host');
                            }
                        });
                    }
                    else
                    {
                        //update hostname by id

                        let id = doc.records.find(element => element.host === program.hostname).id;

                        request.put(url + '/records/' + id, {
                            json: {
                                host: program.hostname,
                                type: 'A',
                                answer: ip,
                                ttl: 300
                            }
                        }, (e, r, b) =>
                        {
                            if (b.answer === ip)
                            {
                                console.log('Host has been updated');
                            }
                            else
                            {
                                console.log('Failed to update host');
                            }
                        });
                    }
                }
            );
        });

    }
}

console.log(`${meta.name}, v.${meta.version} (${meta.description})`);

const app = new Application();
app.run();
