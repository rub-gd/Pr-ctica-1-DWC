import { CRMController } from './controllers/crm.controller';

const crm = new CRMController();

async function ejecutarPrueba() {
    console.log("=== Iniciando simulación de SchoolCRM ===");

    try {
        const asistencia = await crm.registrarAsistencia('alumno1', 'prof1', '1ª Hora', 'presente');

        console.log(`¿Asistencia registrada?: ${asistencia}`);

        await crm.registrarSancion(
            'alumno1',
            'prof1',
            'comportamiento',
            'Ha tenido un mal comportamiento en clase'
        );

        console.log("Sanción registrada correctamente");

    } catch (error) {
        console.error("Error en la ejecución:", error);
    }
}

ejecutarPrueba();
