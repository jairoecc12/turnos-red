export interface TurnoCrudo {
    id: string | number;
    paciente: string;
    documento: number | string;
    especialidad: string;
    fecha: string;
    hora: string;
    confirmado: string | boolean;
  }
  
  export interface Turno {
    id: number;
    paciente: string;
    documento: string;
    especialidad: string;
    fecha: string;
    hora: string;
    confirmado: boolean;
    observaciones?: string;
  }