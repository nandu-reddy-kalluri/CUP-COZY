import { motion } from "framer-motion";

const features = [
  {
    icon: "🫘",
    title: "Single Origin Beans",
    description: "Hand-picked from the finest estates across Ethiopia, Colombia, and Guatemala.",
  },
  {
    icon: "🎨",
    title: "Artisan Craft",
    description: "Every cup is a masterpiece — roasted in small batches, brewed with precision.",
  },
  {
    icon: "🌿",
    title: "Sustainably Sourced",
    description: "Direct trade relationships ensuring fair prices and eco-friendly farming.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function CafeIntro() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">
            Our Story
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-coffee mt-3 mb-6">
            More Than Just Coffee
          </h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto leading-relaxed">
            At Cup & Cozy, we believe that great coffee is an experience — a moment
            of calm in a busy world. Every detail is crafted to make your visit
            unforgettable.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white rounded-2xl p-8 text-center card-shadow hover:card-shadow-hover transition-shadow duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-cream-dark flex items-center justify-center text-3xl mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="font-display text-xl font-semibold text-coffee mb-3">
                {feature.title}
              </h3>
              <p className="text-text-light text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
