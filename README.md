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

# My system:

Linux 3.19.0-30-generic #34~14.04.1-Ubuntu SMP Fri x86_64 GNU/Linux
