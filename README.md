# dynname
Name.com API Client to set IP on hostname when you run on dynamic IP

> To run this service, you need to have [node.js](https://nodejs.org) installed and working account on [name.com](http://name.com)

## Steps to make it working

### Download _dynname_ app

```sh
git clone https://github.com/skitsanos/dynname.git
```

Now, let's get inside of it and setup things

```
cd dynname
```

### Add execution rights to a server.js script

```sh
chmod +x server.js
```

### Install app dependencies

```sh
npm install
```

It will install _commander_ and _request_ packages

### Link it

```sh
npm link
```

### Verify if runs properly

```sh
dynname --help
```

It should print you out something like this:

```
dynname, v.1.0.1 (Dynamic DNS client for name.com)
Usage: dynname -hostname

Options:
  -v, --version              output the version number
  -host, --hostname <hostname>  hostname
  -h, --help                 output usage information
```

## Configure dynname client

There is a +config.json_ file with the following content:

```json
{
  "username": "YOUR NAME.COM USERNAME",
  "token": "NAME.COM TOKEN",
  "domain": "DOMAIN NAME TO BE USED"
}
```

Besides name.com _username_ you need to have also API _token_, which you can get for free from here: [https://www.name.com/api_about](https://www.name.com/api_about). And, of course, you need to have at least one _domain_ registered, so you can setup hostname on it.

Once you have your _config.json_ ready, you can run from comand line a command like this:

```sh
dynname -host foo
```

It will create a foo._yourdomainname_ record in DNS settings of _yourdomainname_.

Now you can setup a cron job or Windows Scheduled Task to execute this script, let's say, every hour, to make sure your DNS is always updated so you can access your location by hostname, instead that dynamic IP that you always have to hunt down because your ISP is changing it all the time. 
