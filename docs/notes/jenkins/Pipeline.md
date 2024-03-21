---
title: Pipeline
titleTemplate: Jenkins
description: Notes for Jenkins Pipeline
head:
  - - meta
    - name: description
      content: Notes for Jenkins Pipeline
tags:
  - Jenkins
categories:
  - Notes
---

# Pipeline <Badge type="tip" text="Jenkins" /><Badge type="warning" text="Notes" />

## What is Jenkins Pipeline?

Jenkins Pipeline (or simply "Pipeline" with a capital "P") is a suite of plugins
which supports implementing and integrating _continuous delivery pipelines_ into Jenkins.

Pipeline provides an extensible set of tools for modeling simple-to-complex delivery
pipelines "as code" via the [Pipeline domain-specific language (DSL) syntax](https://www.jenkins.io/doc/book/pipeline/syntax).

A Jenkinsfile can be written using two types of syntax — Declarative and Scripted.

Declarative and Scripted Pipelines are constructed fundamentally differently.
Declarative Pipeline is a more recent feature of Jenkins Pipeline which:

- provides richer syntactical features over Scripted Pipeline syntax, and
- is designed to make writing and reading Pipeline code easier.

## Declarative Pipeline

::: details Click to view the example

```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                //
            }
        }
        stage('Test') {
            steps {
                //
            }
        }
        stage('Deploy') {
            steps {
                //
            }
        }
    }
}
```

:::

### Environments

::: details Click to view the example

```groovy
pipeline {
    agent any
    environment {
        CC = 'clang'
    }
    stages {
        stage('Example') {
            environment {
                AN_ACCESS_KEY = credentials('my-predefined-secret-text')
            }
            steps {
                sh 'printenv'
            }
        }
    }
}
```

:::

### Parameters

::: details Click to view the example

```groovy
pipeline {
    agent any
    parameters {
        string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')

        text(name: 'BIOGRAPHY', defaultValue: '', description: 'Enter some information about the person')

        booleanParam(name: 'TOGGLE', defaultValue: true, description: 'Toggle this value')

        choice(name: 'CHOICE', choices: ['One', 'Two', 'Three'], description: 'Pick something')

        password(name: 'PASSWORD', defaultValue: 'SECRET', description: 'Enter a password')
    }
    stages {
        stage('Example') {
            steps {
                echo "Hello ${params.PERSON}"

                echo "Biography: ${params.BIOGRAPHY}"

                echo "Toggle: ${params.TOGGLE}"

                echo "Choice: ${params.CHOICE}"

                echo "Password: ${params.PASSWORD}"
            }
        }
    }
}
```

:::

### Triggers

::: details Click to view the example

```groovy
// Declarative //
pipeline {
    agent any
    triggers {
        cron('H */4 * * 1-5')
    }
    stages {
        stage('Example') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
```

:::

Jenkins cron syntax: The Jenkins cron syntax follows the syntax of the cron
utility (with minor differences). Specifically, each line consists of 5 fields
separated by TAB or whitespace:

| MINUTE                         | HOUR                       | DoM                         | MONTH            | DoW                                                 |
| ------------------------------ | -------------------------- | --------------------------- | ---------------- | --------------------------------------------------- |
| Minutes within the hour (0–59) | The hour of the day (0–23) | The day of the month (1–31) | The month (1–12) | The day of the week (0–7) where 0 and 7 are Sunday. |

To specify multiple values for one field, the following operators are available. In the order of precedence,

- \* specifies all valid values
- M-N specifies a range of values
- M-N/X or \*/X steps by intervals of X through the specified range or whole valid range
- A,B,…​,Z enumerates multiple values

### Tools

::: details Click to view the example

```groovy
pipeline {
    agent any
    tools {
        maven 'apache-maven-3.0.1'
    }
    stages {
        stage('Example') {
            steps {
                sh 'mvn --version'
            }
        }
    }
}
```

:::

### Input

::: details Click to view the example

```groovy
pipeline {
    agent any
    stages {
        stage('Example') {
            input {
                message "Should we continue?"
                ok "Yes, we should."
                submitter "alice,bob"
                parameters {
                    string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
                }
            }
            steps {
                echo "Hello, ${PERSON}, nice to meet you."
            }
        }
    }
}
```

:::

### When

::: details Click to view the example

```groovy
pipeline {
    agent any
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            when {
                branch 'production'
                environment name: 'DEPLOY_TO', value: 'production'
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}
```

Nested condition (same behavior as previous example)

```groovy
pipeline {
    agent any
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            when {
                allOf {
                    branch 'production'
                    environment name: 'DEPLOY_TO', value: 'production'
                }
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}
```

Multiple condition and nested condition

```groovy
pipeline {
    agent any
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            when {
                branch 'production'
                anyOf {
                    environment name: 'DEPLOY_TO', value: 'production'
                    environment name: 'DEPLOY_TO', value: 'staging'
                }
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}
```

Expression condition and nested condition

```groovy
pipeline {
    agent any
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            when {
                expression { BRANCH_NAME ==~ /(production|staging)/ }
                anyOf {
                    environment name: 'DEPLOY_TO', value: 'production'
                    environment name: 'DEPLOY_TO', value: 'staging'
                }
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}
```

:::
