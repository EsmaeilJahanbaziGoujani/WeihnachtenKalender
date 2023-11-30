import { Component } from '@angular/core';
import { Kalender_ROW } from './app-inreface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weihnachtenkalender1';

  //Anzahl der Kalender.
  AnzahlKalender = 2;
  //Anzahl der Türen (Fenster) pro Kalender.
  AnzahlTuerchenProKalender = 24;
  //Ein Array von Zeichenfolgen(string), die Mitarbeiter darstellen.
  mitarbeiter: string[] = ["TB", "TBR", "EB", "MVD", "MKB", "TZ", "EJG", "DK"];
  //Ein Array von Kalender_ROW-Objekten(interface), die die ausgewählten Mitarbeiter für jede Kalendertür darstellen.
  kalenderliste: Kalender_ROW[] = [];
  //Ein Objekt, um zu verfolgen, wie oft jeder Mitarbeiter ausgewählt wurde.
  anzahlDerBenutzerauswahlen: { [key: string]: number } = {};
  //Ein Array zum Speichern einer gemischten Liste von Mitarbeitern.
  mitarbeiterMischen: string[] = [];



//   Diese Methode wird ausgelöst, wenn auf die Schaltfläche „UserChoosed“ geklickt wird.
// Es berechnet die maximale Anzahl an Türen, die jede Person öffnen kann, und protokolliert diese Informationen.
// Es setzt den anzahlDerBenutzerauswahlen zurück und mischt die Liste der Mitarbeiter.
// Anschließend wird jede Tür durchlaufen, Mitarbeiter für KalenderA und KalenderB ausgewählt und die Auswahl protokolliert.
// Ein Kalender_ROW-Objekt wird erstellt und in das Kalenderliste-Array verschoben.




  public onUserChoosed(): void {

    const maximalTuerchenOeffnenProPerson = (this.AnzahlKalender * this.AnzahlTuerchenProKalender) / this.mitarbeiter.length;

    console.log('Jede person darf so viele Tuerchen oeffnen: ', maximalTuerchenOeffnenProPerson);



   //Diese Zeile richtet eine Struktur zum Speichern der Anzahl der Benutzerauswahlen ein und initialisiert sie als leeres Objekt.
   //Diese Zeile initialisiert ein leeres Objekt ({})
   //Dies ist eine Eigenschaft(property) des aktuellen Objekts, das initialisiert wird.
   //Nachdem diese Zeile ausgeführt wurde, ist this.anzahlDerBenutzerauswahlen ein leeres Objekt, das bereit ist, Informationen über Benutzerauswahlen zu speichern.
    this.anzahlDerBenutzerauswahlen = {};
   
    //Dies ist eine Eigenschaft(property) des aktuellen Objekts, das die gemischte Reihenfolge der Mitarbeiter speichert.
    //Mit der Spread-Syntax (...) wird ein neues Array erstellt, das alle Elemente von this.mitarbeiter enthält. Es ist eine einfache Möglichkeit, ein Array zu klonen.
    this.mitarbeiterMischen = this.shuffle([...this.mitarbeiter]);




    
    for (let tuerchen = 1; tuerchen <= this.AnzahlTuerchenProKalender; tuerchen++) {
      console.log('tuerchen: ', tuerchen);



      let mitarbeiterA = this.selectEmployee();
      let mitarbeiterB = this.selectEmployee();



      
      console.log(mitarbeiterA);
      console.log(mitarbeiterB);

      const stift: Kalender_ROW = {
        Kalender_Tuerchen: tuerchen,
        KalenderA: mitarbeiterA,
        KalenderB: mitarbeiterB,
      };
      this.kalenderliste.push(stift);
    }
  }

// Diese Methode ist für die Auswahl eines Mitarbeiters verantwortlich.
// Es prüft, ob die gemischte Liste der Mitarbeiter leer ist, und mischt die Liste in diesem Fall erneut.
// Dadurch wird ein Mitarbeiter aus der gemischten Liste entfernt.
// Es prüft, ob die Auswahlanzahl des Mitarbeiters vorhanden ist. Wenn nicht, wird es initialisiert.
// Es erhöht die Auswahlanzahl für den Mitarbeiter.
// Der ausgewählte Mitarbeiter wird dann zurückgegeben.

  private selectEmployee(): string {
    //Dieser Code prüft, ob das Array this.mitarbeiterMischen leer ist. Wenn dies der Fall ist, wird es mit einer gemischten Reihenfolge des ursprünglichen Arrays this.mitarbeiter gefüllt.  Wenn es leer ist, generieren oder initialisieren Sie es neu.
    if (this.mitarbeiterMischen.length === 0) {
      
      this.mitarbeiterMischen = this.shuffle([...this.mitarbeiter]);
    }

    let selectedEmployee = this.mitarbeiterMischen.pop()!;

    
    if (!this.anzahlDerBenutzerauswahlen[selectedEmployee]) {
      this.anzahlDerBenutzerauswahlen[selectedEmployee] = 0;
    }

    
    this.anzahlDerBenutzerauswahlen[selectedEmployee]++;

    return selectedEmployee;
  }

  private shuffle(array: string[]): string[] {
    let currentIndex = array.length;
    let randomIndex, tempValue;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      
      tempValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempValue;
    }

    return array;
  }
}
