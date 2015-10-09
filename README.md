# Repro:

```bash
git clone git@github.com:cjsauer/astronomy-issue-114.git
cd astronomy-issue-114
meteor

#Observe incorrect output in console
#Kill meteor

git checkout --track origin/workaround
meteor

#Observe correct output in console
```
