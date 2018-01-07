## PRACTICA REACT-NATIVE 
## UNIVERSO MARVEL

Presenta los personajes de Marvel en un listado. Al acceder a cualquiera de ellos, muestra su descripción y permite navegar a los comics en los que aparece, las series en las que se le puede ver y los eventos de los que forma parte. En cada una de estas tres partes, se puede ver la vista de detalle de la opción (comic, serie, evento) seleccionado.

La navegación se ha realizado con 'react-native-redux-flux' y se ha usado la barra de navegación (navBar) y un tabBar para seleccionar los comics/eventos/personajes.

La comunicación se ha realizado con 'axios' directamente, sin ningún componente de terceros.

Como componentes de terceros se han usado 'react-native-spinKit' y 'react-native-image-picker'

Se ha creado una vista para dar de alta personajes, añadiendo a la barra de navegación de la pantalla de personajes el botón '+'.

Se han creado los componentes 'Button' e 'Input' personalizados. El 'Input' es multilínea para descripciones largas de personajes.

Se crea un 'store' para toda la aplicación con 'redux'.
