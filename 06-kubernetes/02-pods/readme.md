# Comandos con Pods

### Para ejecutar un manifiesto

```
kubectl apply -f <nombre del manifiesto>
```

### Para eliminar el o los elementos creados por un manifiesto

```
kubectl delete -f <nombre del manifiesto>
```

### Para listar pods

```
kubectl get pods
kubectl get po
```

### Para eliminar un pod

```
kubectl delete po <nombre del pod>
```

### Para listar los pods con sus etiquetas

```
kubectl get po --show-labels
kubectl get po --show-labels -l env=dev
```

### Para obtener el manifiesto de un pod

```
kubectl get po <nombre del pod> -o <yaml | json>
```

### Para ingresar a un contenedor dentro de un pod

```
kubectl exec -it deployment-web-5886484684-6hmmf -c <nombre contenedor> -- sh
```
