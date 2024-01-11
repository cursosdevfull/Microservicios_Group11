# Usuarios

### Para crear un usuario

```
kubectl config set-credentials cursosdev --client-certificate=cursosdev.crt --client-key=cursosdev.key
```

### Para crear un contexto con un usuario

```
kubectl config set-context ctx-cursosdev --cluster=docker-desktop --user=cursosdev
```
