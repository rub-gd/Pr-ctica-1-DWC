import type { Asistencia, Sancion, RegistroHorario, EstadoAsistencia, TipoSancion } from '../models/interfaces';
import { StorageService } from '../services/storage.service';

export class CRMController {
    // Inicialización de los almacenes persistentes
    private asistenciaStorage = new StorageService<Asistencia>('crm_asistencias');
    private sancionesStorage = new StorageService<Sancion>('crm_sanciones');
    private horariosStorage = new StorageService<RegistroHorario>('crm_horarios');

    /**
     * Registra una falta, retraso o asistencia en el sistema de forma asíncrona.
     */
    public async registrarAsistencia(alumnoId: string, profesorId: string, franja: string, estado: EstadoAsistencia): Promise<boolean> {
    // TODO: El alumno debe implementar la simulación de retraso de red (setTimeout con Promise)
    // y añadir el registro usando el servicio de almacenamiento.

    await new Promise<void>((resolve) => {
        setTimeout(resolve, 500);
    });

    const nuevaAsistencia: Asistencia = {
        id: crypto.randomUUID(),
        alumnoId: alumnoId,
        profesorId: profesorId,
        fecha: new Date().toISOString().split('T')[0],
        franja: franja,
        estado: estado
    };

    this.asistenciaStorage.add(nuevaAsistencia);

    return true;
}
    /**
     * Registra una sanción disciplinaria.
     */
public async registrarSancion(alumnoId: string, profesorId: string, tipo: TipoSancion, descripcion: string): Promise<void> {
    // TODO: Implementar lógica de inserción asíncrona.

    await new Promise<void>((resolve) => {
        setTimeout(resolve, 500);
    });

    const nuevaSancion: Sancion = {
        id: crypto.randomUUID(),
        alumnoId: alumnoId,
        profesorId: profesorId,
        fecha: new Date().toISOString().split('T')[0],
        tipo: tipo,
        descripcion: descripcion
    };
    this.sancionesStorage.add(nuevaSancion);
}

    /**
     * VERIFICACIÓN CRÍTICA: Comprueba si un profesor ya tiene una clase asignada en el mismo día y hora.
     * Devuelve true si hay conflicto (el profesor está duplicado) o false si está libre.
     */
    public async comprobarConflictoProfesor(profesorId: string, dia: string, franja: string): Promise<boolean> {
    // TODO: Recuperar los horarios y utilizar métodos de array (.some, .filter, etc.) 
    // para buscar coincidencias exactas.

    await new Promise<void>((resolve) => {
        setTimeout(resolve, 500);
    });

    const horarios = this.horariosStorage.getAll();

    const conflicto = horarios.some((horario) => {
        return horario.profesorId === profesorId &&
               horario.dia === dia &&
               horario.franja === franja;
    });

    return conflicto;
}
    /**
     * Genera un informe resumido con el total de faltas y retrasos de un alumno concreto.
     */
    public async obtenerInformeAlumno(alumnoId: string): Promise<{ faltas: number; retrasos: number; sanciones: number }> {
    // TODO: Filtrar asistencias y sanciones del alumno para devolver el objeto con los contadores.

    await new Promise<void>((resolve) => {
        setTimeout(resolve, 500);
    });

    const asistencias = this.asistenciaStorage.getAll();
    const sanciones = this.sancionesStorage.getAll();

    const faltas = asistencias.filter(asistencia =>
        asistencia.alumnoId === alumnoId && asistencia.estado === 'falta'
    ).length;

    const retrasos = asistencias.filter(asistencia =>
        asistencia.alumnoId === alumnoId && asistencia.estado === 'retraso'
    ).length;

    const totalSanciones = sanciones.filter(sancion =>
        sancion.alumnoId === alumnoId
    ).length;

    return {
        faltas: faltas,
        retrasos: retrasos,
        sanciones: totalSanciones
    };
}
}