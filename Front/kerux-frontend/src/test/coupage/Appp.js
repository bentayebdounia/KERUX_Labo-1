import React, { useState } from 'react';

function Tableau() {
  const [tableau, setTableau] = useState([
    { id: 1, nom: 'Element 1' },
    { id: 2, nom: 'Element 2' },
    { id: 3, nom: 'Element 3' },
    { id: 4, nom: 'Element 4' },
    { id: 5, nom: 'Element 5' },
  ]);
  const [selection, setSelection] = useState([]);

  const estSelectionne = (id) => {
    return selection.indexOf(id) !== -1;
  };

  const selectionnerLigne = (id) => {
    const nouveauSelection = [...selection];
    if (estSelectionne(id)) {
      nouveauSelection.splice(nouveauSelection.indexOf(id), 1);
    } else {
      nouveauSelection.push(id);
    }
    setSelection(nouveauSelection);
  };

  const supprimerLignesSelectionnees = () => {
    const nouveauTableau = tableau.filter((element) => !estSelectionne(element.id));
    setTableau(nouveauTableau);
    setSelection([]);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Selection</th>
          </tr>
        </thead>
        <tbody>
          {tableau.map((element) => (
            <tr key={element.id} className={estSelectionne(element.id) ? 'selectionne' : ''}>
              <td>{element.id}</td>
              <td>{element.nom}</td>
              <td>
                <input
                  type="checkbox"
                  checked={estSelectionne(element.id)}
                  onChange={() => selectionnerLigne(element.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={supprimerLignesSelectionnees}>Supprimer les lignes sélectionnées</button>
    </div>
  );
}

export default Tableau;
