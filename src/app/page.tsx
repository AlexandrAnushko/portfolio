import { Link } from "@/shared/components/Link";
import { ROUTES } from "@/shared/constants/routes";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center flex-1">
      <section className="flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-[90%] xl:max-w-[80%] gap-10 md:gap-20 py-6">
        <div className="flex flex-col w-full md:w-auto md:max-w-[50%] gap-6 md:gap-10 items-center md:items-start text-center md:text-left">
          <h2 className="text-md sm:text-lg md:text-xl font-semibold uppercase text-primary">
            Frontend developer
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-semibold uppercase">
            Alexandr <br /> Anushko
          </h1>
          <p className="text-grey-text text-base md:text-lg font-semibold">
            Frontend developer, based in Minsk.
            <br />
            Need a good team member?
            <Link
              href="https://www.linkedin.com/in/alexandranushko/"
              className="text-white"
              textTransform="normal-case"
              target="_blank"
            >{` Let's talk`}</Link>
          </p>
          <div className="flex gap-4 justify-center lg:justify-start">
            <Link href={ROUTES.PROJECTS} mode="primary">
              My Projects
            </Link>
            <Link href={ROUTES.CONTACT} mode="outline">
              Contact me
            </Link>
          </div>
        </div>
        <div className="w-[60%] sm:w-[45%] md:w-auto md:max-w-[50%] shrink-0">
          <Image
            src="/avatar.jpg"
            alt="author photo"
            width={500}
            height={500}
            loading="eager"
            className="w-full h-auto lg:min-w-75 xl:min-w-100 rounded-xl"
          />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full max-w-[90%] xl:max-w-[40%] gap-4 md:gap-6">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold uppercase text-primary">
          About this app
        </h3>
        <p className="text-grey-text text-base md:text-lg font-semibold">
          This application is created to present my experience in project
          development. In addition to a brief overview of my projects, you can
          also register in the system and access the internal task planning
          page. This feature includes task management via the calendar, as well
          as the ability to group tasks into different folders.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel repellat
          delectus id consectetur, dicta provident accusamus temporibus. Illo
          harum praesentium eum officiis. Temporibus reiciendis nesciunt ullam
          repellendus. Quas, cupiditate aut. Quidem nulla mollitia officia,
          soluta id, veritatis suscipit rerum optio dicta libero aperiam,
          voluptates porro tempore illum reprehenderit similique voluptatibus
          sequi enim corporis. Fugit distinctio iure cum voluptatibus possimus
          cumque. Iure quidem natus vitae ut necessitatibus adipisci, odit nemo
          deleniti laborum, quas sunt voluptatum? Excepturi est assumenda ut
          aperiam ipsa facere error natus. Rem atque, aperiam doloremque facilis
          eos voluptatum! Voluptate laudantium debitis magnam! Distinctio ex
          temporibus vitae necessitatibus qui eum, possimus reiciendis, magnam
          dolorem assumenda, minus nisi voluptatem molestias esse ipsum eaque.
          Odit, ipsam! Dolore eligendi cum hic laboriosam! Quis ut itaque facere
          autem iusto ullam incidunt nulla repellendus atque porro vero dolore
          tempore dolorem voluptatem, ipsam sint laboriosam similique nisi
          repudiandae! Asperiores, nobis fugiat fugit distinctio sunt
          repellendus. Sequi, dolorum placeat! Odio iste quibusdam harum aut
          modi doloremque, nesciunt numquam cum saepe, inventore perspiciatis
          sed tempora maxime nihil, quod veritatis excepturi illum est eaque
          repudiandae eveniet delectus laboriosam? Molestiae accusantium aliquid
          dignissimos omnis, iure debitis unde impedit fugit repellat
          consequuntur placeat rem necessitatibus eius perspiciatis cum error
          dolorum illo doloremque? Nisi quae esse numquam dignissimos.
          Temporibus, doloribus ea! Sit accusantium, expedita assumenda
          laudantium adipisci quisquam nam earum vero eveniet aliquam numquam
          nihil aspernatur similique illo laborum fugit consequuntur! Recusandae
          a maxime vero fugiat consequuntur nostrum praesentium quas voluptatem.
          Repellendus eveniet itaque facere quam sint inventore quibusdam vel
          non magnam eligendi ducimus odit sed at molestias, quasi quod
          nesciunt. Culpa, modi? Iure, nostrum consequatur quae nihil fugiat
          nisi. Illo. Facere fugit mollitia ex repudiandae dolores quos
          veritatis adipisci doloribus magnam consectetur voluptates,
          exercitationem sit sunt quas aperiam voluptatum dolore inventore ipsum
          quasi, odio porro, natus praesentium nisi eius? Libero.
        </p>
      </section>
    </main>
  );
}
