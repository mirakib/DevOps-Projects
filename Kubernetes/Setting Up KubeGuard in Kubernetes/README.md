# Install Open Policy Agent (OPA)

### Step 1: Install OPA Gatekeeper:

```bash
kubectl apply -f https://raw.githubusercontent.com/open-policy-
agent/gatekeeper/master/deploy/gatekeeper.yaml
```

### Step 2: Verify OPA Installation

```bash
kubectl get pods -n gatekeeper-system
```

# Deploy Kyverno

### Step 1: Install Kyverno using Helm:

```bash
helm repo add kyverno https://kyverno.github.io/kyverno/
helm install kyverno kyverno/kyverno -n kyverno --create-namespace
```

### Step 2: Verify Kyverno Installation

```bash
kubectl get pods -n kyverno
```

# Enforcing Security Policies with OPA & Kyverno

Example 1: Prevent Containers from Running as Root

### Step 1: OPA Policy (Constraint Template) - policy.yaml:

```yaml
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: k8spspprivileged
spec:
  crd:
    spec:
      names:
        kind: K8sPSPPrivilegedContainer
  targets:
  - target: admission.k8s.gatekeeper.sh
    rego: |
      package k8spspprivileged
      violation[{"msg": msg}] {
        input.review.object.spec.securityContext.runAsUser == 0
        msg := "Running as root is not allowed!"
      }
```

### Step 2: Apply the OPA Policy:

```bash
kubectl apply -f policy.yaml
```

# Real-Time Threat Detection with Falco

### Step 1: Install Falco for runtime security monitoring:

```bash
helm repo add falcosecurity https://falcosecurity.github.io/charts
helm install falco falcosecurity/falco
```

### Step 2: Modify Falco's rule file (`/etc/falco/falco_rules.yaml`):

```yaml
- rule: Detect Unauthorized Exec
  desc: "Detect exec command in container"
  condition: evt.type = execve and container.id != host
  output: "Unauthorized exec detected (command=%proc.cmdline container=%container.id)"
  priority: CRITICAL
```

### Step 3: Restart Falco :

```bash
systemctl restart falco
```

# Container Image Scanning with Trivy

### Step 1: Install Trivy:

```bash
brew install aquasecurity/trivy/trivy
```
### Step 2: Scan a container image:

```bash
trivy image nginx:latest
```

### Step 3: Deploy Trivy in Kubernetes:

```bash
kubectl apply -f
https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/kubernetes/trivy.yaml
```

# Centralized Monitoring & Logging

### Step 1: Install Prometheus

```bash
helm repo add prometheus-community https://prometheus-
community.github.io/helm-charts
helm install prometheus prometheus-community/prometheus
```

### Step 2: Install Elasticsearch & Kibana for Security Logs

```bash
helm repo add elastic https://helm.elastic.co
helm install elasticsearch elastic/elasticsearch
helm install kibana elastic/kibana
```

# Advanced Security Configurations

### Step 1: RBAC Hardening

- Example policy - rbac.yaml:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: restricted-user
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list"]
```

### Step 2: Apply RBAC settings:

```bash
kubectl apply -f rbac.yaml
```

# Troubleshooting & Best Practices

### Step 1: Debugging Policy Enforcement Issues

```bash
kubectl logs -n gatekeeper-system -l gatekeeper.sh/system
```

### Step 2: Investigating Falco Alerts

```bash
kubectl get events -A | grep Falco
```