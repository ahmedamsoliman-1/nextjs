#!/bin/bash

# kubectl create deployment nestjs-metrics-2 --image=ahmedalimsolimansd/nestjs-metrics --port 3000 --dry-run=client -o yaml > deployment-2.yaml


# helm dependency update
# helm install nestjs-metrics .


# kubectl get po

# kubectl logs nestjs-metrics-795664d688-4zpc8 --follow
# kubectl logs nestjs-metrics-grafana --follow

# kubectl get svc


# kubectl get secret nestjs-metrics-grafana -o jsonpath="{.data.admin-password}" | base64 --decode; echo
# ObWsmkN6C56cBBtXsBeCy5J2EP1MJPA4UVqZLtVX
