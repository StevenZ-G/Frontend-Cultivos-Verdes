import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  /**
   * Ordena un array de objetos por una o varias propiedades
   * @param array Array a ordenar
   * @param sortBy Propiedad(s) por la que ordenar (puede ser string o array de strings)
   * @param order 'asc' o 'desc' (opcional, default 'asc')
   * @returns Nuevo array ordenado (no muta el original)
   */
  sortArray<T>(array: T[], sortBy: string | string[], order: 'asc' | 'desc' = 'asc'): T[] {
    // Crear copia para no mutar el array original
    const sortedArray = [...array];

    // Convertir a array si es un string
    const properties = Array.isArray(sortBy) ? sortBy : [sortBy];

    sortedArray.sort((a, b) => {
      return this.compareObjects(a, b, properties, order);
    });

    return sortedArray;
  }

  private compareObjects<T>(a: T, b: T, properties: string[], order: string): number {
    for (const prop of properties) {
      // Acceso a propiedades anidadas (ej: 'direccion.calle')
      const valueA = this.getNestedProperty(a, prop);
      const valueB = this.getNestedProperty(b, prop);

      // Comparación
      let comparison = 0;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        comparison = valueA.localeCompare(valueB, undefined, { sensitivity: 'base' });
      } else {
        comparison = (valueA > valueB) ? 1 : (valueA < valueB) ? -1 : 0;
      }

      if (comparison !== 0) {
        return order === 'desc' ? comparison * -1 : comparison;
      }
    }
    return 0;
  }

  private getNestedProperty<T>(obj: T, path: string): any {
    return path.split('.').reduce((o: any, p: string) => o?.[p], obj);
  }
}
