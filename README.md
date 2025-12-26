# SpotIt

Aplicação web desenvolvida para a disciplina de **Desenvolvimento de Software para Web** da UFC. O projeto SpotIt é uma plataforma interativa para conectar pessoas que perderam objetos àquelas que os encontraram. O sistema facilita o cadastro, a busca e a recuperação de itens perdidos através de um mural digital interativo.

## Tecnologias Utilizadas

### Backend
- **Python** (Django 5.2.9)
- **Django REST Framework**
- **PostgreSQL** (banco de dados)
- **CORS Headers**

### Frontend
- **React** (versão 19.2.0 com TypeScript)
- **Vite** (ferramenta de build)
- **Tailwind CSS** (estilização)
- **Axios** (requisições HTTP)
- **React Hook Form + Zod** (formulários e validação)
- **React Router DOM** (roteamento)

### Infraestrutura
- **Docker** e **Docker Compose** (containerização)

## Pré-requisitos

- **Docker** e **Docker Compose** instalados
- **Node.js** (versão 18 ou superior) para desenvolvimento do frontend
- **Python** (versão 3.8 ou superior) para desenvolvimento do backend (opcional, se não usar Docker)

## Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd SpotIt
   ```

2. **Configure o ambiente:**
   - Copie o arquivo `.env.example` para `.env` (se existir) ou crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
     ```
     SECRET_KEY=sua-chave-secreta-aqui
     DEBUG=True
     ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

     POSTGRES_NAME=spotit_db
     POSTGRES_USER=admin
     POSTGRES_PASSWORD=sua-senha-aqui
     POSTGRES_HOST=db
     POSTGRES_PORT=5432

     VITE_API_URL=http://localhost:8000
     ```
     **Atenção:** Nunca commite o arquivo `.env` no repositório, pois ele contém informações sensíveis.

3. **Inicie os serviços com Docker:**
   ```bash
   docker-compose up --build
   ```
   Isso irá:
   - Construir e iniciar o banco de dados PostgreSQL.
   - (Se configurado) iniciar o backend Django.

## Executando o Projeto

### Com Docker (Recomendado)
- Backend e banco de dados já estarão rodando via Docker Compose.
- Para o frontend, em outro terminal:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
  Acesse em: `http://localhost:5173`

### Sem Docker (Desenvolvimento Local)
1. **Banco de dados:**
   - Instale e configure PostgreSQL localmente, ou use o container do Docker apenas para o DB.

2. **Backend:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   pip install -r requirements.txt  # Se existir, ou instale manualmente: django, djangorestframework, psycopg2, python-dotenv, django-cors-headers
   python manage.py migrate
   python manage.py runserver
   ```
   Acesse em: `http://localhost:8000`

3. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Acesse em: `http://localhost:5173`

## Estrutura do Projeto

```
SpotIt/
├── backend/          # Código do backend Django
├── frontend/         # Código do frontend React
├── docker-compose.yml # Configuração Docker
├── .env              # Variáveis de ambiente (não commitado)
└── .gitignore        # Arquivos ignorados pelo Git
```

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.