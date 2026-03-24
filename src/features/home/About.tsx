export const About = () => {
  return (
    <section className="py-20 bg-dark-grey">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-primary text-center mb-8 tracking-wide">
          ABOUT THIS APP
        </h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto leading-relaxed mb-16">
          This application is created to present my experience in project
          development. In addition to a brief overview of my projects, you can
          also register in the system and access the internal task planning
          page. This feature includes task management via the calendar, as well
          as the ability to group tasks into different folders.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-asphalt p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors">
            <div className="text-primary text-4xl mb-4">5+</div>
            <h3 className="text-xl mb-2">Years Experience</h3>
            <p className="text-gray-400">Building modern web applications</p>
          </div>
          <div className="bg-asphalt p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors">
            <div className="text-primary text-4xl mb-4">15+</div>
            <h3 className="text-xl mb-2">Projects Completed</h3>
            <p className="text-gray-400">Across various industries</p>
          </div>
          <div className="bg-asphalt p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors">
            <div className="text-primary text-4xl mb-4">100%</div>
            <h3 className="text-xl mb-2">Client Satisfaction</h3>
            <p className="text-gray-400">Quality is my priority</p>
          </div>
        </div>
      </div>
    </section>
  );
};
