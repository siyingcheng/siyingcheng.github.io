---
title: Installing
titleTemplate: Jenkins
description: Notes for Jenkins Installing
head:
  - - meta
    - name: description
      content: Notes for Jenkins Installing
tags:
  - Jenkins
categories:
  - Notes
---

# Installing <Badge type="tip" text="Jenkins" /><Badge type="warning" text="Notes" />

- [Docker](https://www.jenkins.io/doc/book/installing/docker/)
- [kubernetes](https://www.jenkins.io/doc/book/installing/kubernetes/)
- [Linux](https://www.jenkins.io/doc/book/installing/linux/)
- [MacOS](https://www.jenkins.io/doc/book/installing/macos/)
- [Windows](https://www.jenkins.io/doc/book/installing/windows/)
- [War-File](https://www.jenkins.io/doc/book/installing/war-file/)

[_Here_](https://github.com/siyingcheng/smile-jenkins) is a my jenkins repository.

Step by step:

1. Clone to local: `git@github.com:siyingcheng/smile-jenkins.git`
2. Create a bridge network for docker: `docker network create jenkins`
3. Enter the directory of step 1, and build with Dockerfile: `docker build -t myjenkins-blueocean:2.440.1-1 .`
4. Run your own image as a container:

```shell
docker run --name jenkins-blueocean --restart=on-failure --detach \
  --network jenkins --env DOCKER_HOST=tcp://docker:2376 \
  --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 \
  --publish 8081:8080 --publish 50000:50000 \
  --volume jenkins-data:/var/jenkins_home \
  --volume jenkins-docker-certs:/certs/client:ro \
  myjenkins-blueocean:2.440.1-1
```

And, if you want to use a local directory as data storage, you can use
`--volume /path/to/jenkins-data:/var/jenkins_home` instead of `--volume jenkins-data:/var/jenkins_home`.

```shell
docker run --name jenkins-blueocean --restart=on-failure --detach \
  --network jenkins --env DOCKER_HOST=tcp://docker:2376 \
  --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 \
  --publish 8081:8080 --publish 50000:50000 \
  --volume jenkins-docker-certs:/certs/client:ro \
  --volume /Volumes/Data/smile-jenkins/jenkins_home:/var/jenkins_home \
  myjenkins-blueocean:2.440.1-1
```

You may need to get the initial password with `cat`:

```shell
docker exec jenkins-blueocean cat /var/jenkins_home/secrets/initialAdminPassword
```

Or, with `logs`:

```shell
docker logs -f jenkins-blueocean
```
