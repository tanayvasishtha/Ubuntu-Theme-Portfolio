const SkillsWindow = () => {
  const skillCategories = {
    Frontend: [
      { name: "React", icon: "/assets/skills-icons/react.png" },
      { name: "Vue", icon: "/assets/skills-icons/vue.png" },
      { name: "TypeScript", icon: "/assets/skills-icons/typescript.png" },
      { name: "JavaScript", icon: "/assets/skills-icons/javascript.png" },
      { name: "HTML", icon: "/assets/skills-icons/html.png" },
      { name: "CSS", icon: "/assets/skills-icons/css.png" },
      { name: "TailwindCSS", icon: "/assets/skills-icons/tailwindcss.png" },
      { name: "Sass", icon: "/assets/skills-icons/sass.png" },
      { name: "Bootstrap", icon: "/assets/skills-icons/bootstrap.png" },
      { name: "Nuxt", icon: "/assets/skills-icons/nuxt.png" },
      { name: "Astro", icon: "/assets/skills-icons/astro.png" },
      { name: "Svelte", icon: "/assets/skills-icons/svelte.png" },
    ],
    Backend: [
      { name: "Node.js", icon: "/assets/skills-icons/nodejs.png" },
      { name: "Express", icon: "/assets/skills-icons/express.png" },
      { name: "Fastify", icon: "/assets/skills-icons/fastify.png" },
      { name: "NestJS", icon: "/assets/skills-icons/nestjs.png" },
      { name: "Python", icon: "/assets/skills-icons/python.png" },
      { name: "Django", icon: "/assets/skills-icons/django.png" },
      { name: "Flask", icon: "/assets/skills-icons/flask.png" },
      { name: "FastAPI", icon: "/assets/skills-icons/fastapi.png" },
      { name: "C#", icon: "/assets/skills-icons/csharp.png" },
      { name: "Rust", icon: "/assets/skills-icons/rust.png" },
    ],
    Database: [
      { name: "MongoDB", icon: "/assets/skills-icons/mongodb.png" },
      { name: "PostgreSQL", icon: "/assets/skills-icons/postgres.png" },
      { name: "Mongoose", icon: "/assets/skills-icons/mongoose.png" },
      { name: "Prisma", icon: "/assets/skills-icons/prisma.png" },
    ],
    "DevOps & Cloud": [
      { name: "Docker", icon: "/assets/skills-icons/docker.png" },
      { name: "Kubernetes", icon: "/assets/skills-icons/kubernetes.png" },
      { name: "AWS", icon: "/assets/skills-icons/aws.png" },
      { name: "Terraform", icon: "/assets/skills-icons/terraform.png" },
      { name: "Serverless", icon: "/assets/skills-icons/serverless.png" },
      { name: "Vercel", icon: "/assets/skills-icons/vercel.png" },
    ],
    "Data Science & ML": [
      { name: "Python", icon: "/assets/skills-icons/python.png" },
      { name: "NumPy", icon: "/assets/skills-icons/numpy.png" },
      { name: "Pandas", icon: "/assets/skills-icons/pandas.png" },
      { name: "Scikit-learn", icon: "/assets/skills-icons/scikit-learn.png" },
      { name: "PyTorch", icon: "/assets/skills-icons/pytorch.png" },
      { name: "XGBoost", icon: "/assets/skills-icons/xgboost.png" },
      { name: "SciPy", icon: "/assets/skills-icons/scipy.png" },
      { name: "Seaborn", icon: "/assets/skills-icons/seaborn.png" },
      { name: "MLflow", icon: "/assets/skills-icons/mlflow.png" },
      { name: "LangChain", icon: "/assets/skills-icons/langchain.png" },
      { name: "Evidently", icon: "/assets/skills-icons/evidently.png" },
      { name: "Prefect", icon: "/assets/skills-icons/prefect.png" },
      { name: "Grafana", icon: "/assets/skills-icons/grafana.png" },
      { name: "MATLAB", icon: "/assets/skills-icons/matlab.png" },
    ],
    "Tools & Others": [
      { name: "Git", icon: "/assets/skills-icons/git.png" },
      { name: "Bitbucket", icon: "/assets/skills-icons/bitbucket.png" },
      { name: "Jira", icon: "/assets/skills-icons/jira.png" },
      { name: "PyPI", icon: "/assets/skills-icons/pypi.png" },
      { name: "Pytest", icon: "/assets/skills-icons/pytest.png" },
      { name: "Pylint", icon: "/assets/skills-icons/pylint.png" },
      { name: "Conda", icon: "/assets/skills-icons/conda.png" },
      { name: "Venv", icon: "/assets/skills-icons/venv.png" },
      { name: "Redux", icon: "/assets/skills-icons/redux.png" },
      { name: "Pinia", icon: "/assets/skills-icons/pinia.png" },
    ],
  };

  return (
    <div className="h-full bg-card p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Skills & Technologies
      </h2>
      <div className="space-y-8">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">
              {category}
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer"
                  title={skill.name}
                >
                  <div className="w-12 h-12 mb-2 flex items-center justify-center">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="text-xs text-card-foreground text-center leading-tight">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsWindow;
