import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { Brain } from 'lucide-react';

const features = [
    {
        name: 'Eficiencia.',
        description:
            'Nuestro sistema simplifica todos los procesos necesarios a nivel de gestión, brindándote una solución integral. Olvídate de perder tiempo buscando documentos físicos o archivos dispersos. Con Skool, toda la información relevante de los estudiantes estará a tu alcance de manera rápida y eficiente.',
        icon: Brain,
    },
    {
        name: 'Seguridad.',
        description: 'Skool sigue todas las buenas prácticas a nivel de seguridad, lo que lo convierte en un sistema académico confiable y robusto. Esta característica garantiza la protección de la información académica sensible y la privacidad de los usuarios.',
        icon: LockClosedIcon,
    },
    {
        name: 'Database backups.',
        description: 'Skool realiza copias de seguridad periódicas y sistemáticas de todos los datos almacenados en la plataforma. Esto incluye registros estudiantiles, calificaciones, materiales de estudio, horarios, comunicaciones y cualquier otro tipo de información relevante..',
        icon: ServerIcon,
    },
]

export default function Feature() {
    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">Funcionalidades</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Un mejor flujo de trabajo</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Skool simplificará toda la complejidad existente en la gestión educativa. Descubran cómo nuestras
                                funcionalidades intuitivas y eficientes reducirán la carga de trabajo, simplificarán los
                                procesos administrativos y mejorarán la experiencia de estudiantes, profesores y personal.
                                ¡Prepárense para descubrir una nueva forma de disfrutar del aprendizaje sin complicaciones!
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                            {feature.name}
                                        </dt>{' '}
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <img
                        src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                        alt="Product screenshot"
                        className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                        width={2432}
                        height={1442}
                    />
                </div>
            </div>
        </div>
    )
}
