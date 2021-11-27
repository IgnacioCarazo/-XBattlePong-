using ApiData.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NetCoreApiSQL.Controllers;
using System.Net;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;
namespace UnitTest
{
    /// <summary>
    /// Clase utilizada para el desarrollo de pruebas Xunit
    /// Las pruebas consisten en 3 fases: La primera fase arrange se crea el objeto de prueba y el moq para simular la interfaz a probar,
    /// la segunda fase act, se hace prueba de la funcion y por ultimo la tercera fase se comprueba los resultados obtenidos.
    /// </summary>
    public class BackEndUnitTest
    {
        private readonly ITestOutputHelper _output;
        /// <summary>
        /// Constructor inicia posibles objetos a usar en las funciones
        /// </summary>
        /// <param name="output">Ayuda en a imprimir mensajes durante las pruebas en caso de ser necesario</param>
        public BackEndUnitTest(ITestOutputHelper output)
        {
            _output = output;
        }
        /// <summary>
        /// Prueba CreateEvent_ValidObjectPassed_ReturnsCreatedResponseAsync
        /// Envia un objeto evento valido y esperar como respuesta un 'Ok'     
        /// </summary>
        [Fact]
        public async Task CreateEvent_ValidObjectPassed_ReturnsCreatedResponseAsync()
        {
            //Arrange
            var mockEventClient = new Mock<IEvent>();
            var testItem = new ApiModel.Event()
            {
                number = 1,
                event_key = "CPIPOT",
                event_code = 12345,
                name = "Prueba Unitaria",
                initial_date = "2021-10-20",
                final_date = "2021-10-21",
                initial_time = "12:00",
                final_time = "12:00",
                board_columns = 10,
                board_rows = 10,
                country = "Costa Rica",
                location = "Alajuelita",
                multiplayer = 0,
                client_name = "Pepsi",
                shooting_time = 10
            };
            mockEventClient.Setup(c => c.InsertEvent(testItem)).ReturnsAsync(true);
            EventController service = new EventController(mockEventClient.Object);
            //Act
            var result = await service.CreateEvent(testItem) as ObjectResult;
            var actualResult = result.Value;
            //Assert
            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
            mockEventClient.Verify(c => c.InsertEvent(It.IsAny<ApiModel.Event>()), Times.Once);
        }
        /// <summary>
        /// Prueba CreateEvent_NullObjectPassed_ReturnsTypeEventEmptyList
        /// Envia un evento nulo y este responde con que encuentra la lista tipo evento pero vacia.
        /// </summary>
        [Fact]
        public async Task CreateEvent_NullObjectPassed_ReturnsTypeEventEmptyList()
        {
            //Arrange
            var mockEvent = new Mock<IEvent>();
            ApiModel.Event nullEvent = new ApiModel.Event();
            mockEvent.Setup(c => c.InsertEvent(nullEvent)).ReturnsAsync(false);
            EventController service = new EventController(mockEvent.Object);
            //Act
            var result = await service.CreateEvent(nullEvent) as ObjectResult;
            var actualResult = result.Value;

            //Assert
            mockEvent.Verify(c => c.InsertEvent(It.IsAny<ApiModel.Event>()), Times.Once);
            Assert.IsType<ApiModel.Event[]>(result.Value);
        }
        /// <summary>
        /// Prueba CreateMatch_ValidObjectPassed_ReturnsCreatedResponseAsync
        /// Envia un objeto match valido y esperar como respuesta un 'Ok'  
        /// </summary>
        [Fact]
        public async Task CreateMatch_ValidObjectPassed_ReturnsCreatedResponseAsync()
        {
            // Arrange
            var mockMatchClient = new Mock<IMatch>();
            var testItem = new ApiModel.Match()
            {
                event_key = "CPIPOT",
                match_id = 12345,
                player1 = "Haziel",
                player2 = "Ignacio",
                players = 2,
                player_1_ships = null,
                player_2_ships = null,
                player_1_history = 1,
                player_2_history = 1
            };
            mockMatchClient.Setup(c => c.InsertMatch(testItem)).ReturnsAsync(true);
            MatchController service = new MatchController(mockMatchClient.Object);
            //Act
            var result = await service.CreateMatch(testItem) as ObjectResult;
            var actualResult = result.Value;
            //Assert
            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
            mockMatchClient.Verify(c => c.InsertMatch(It.IsAny<ApiModel.Match>()), Times.Once);
        }
        /// <summary>
        /// Prueba CreateMatch_NullObjectPassed_ReturnsTypeMatchEmptyList
        /// Envia un match nulo y este responde con que encuentra la lista tipo match pero vacia.
        /// </summary>
        [Fact]
        public async Task CreateMatch_NullObjectPassed_ReturnsTypeMatchEmptyList()
        {
            // Arrange
            var mockMatch = new Mock<IMatch>();
            ApiModel.Match nullMatchItem = new ApiModel.Match() ;
            mockMatch.Setup(c => c.InsertMatch(nullMatchItem)).ReturnsAsync(true);
            MatchController service = new MatchController(mockMatch.Object);
            //Act
            ObjectResult result = await service.CreateMatch(nullMatchItem) as ObjectResult;
            //Assert
            mockMatch.Verify(c => c.InsertMatch(It.IsAny<ApiModel.Match>()), Times.Once);
            Assert.IsType<ApiModel.Match[]>(result.Value);
        }
        /// <summary>
        /// Prueba SearchMatch_ValidIDPassed_ReturnsMatch
        /// Hace una busqueda de un id que si encuentra, devuelve un objeto tipo Match
        /// </summary>
        [Fact]
        public async void SearchMatch_ValidIDPassed_ReturnsMatch()
        {
            //Arrange
            Mock<IMatch> mock = new Mock<IMatch>();
            var testItem = new ApiModel.Match(){
                event_key = "CPIPOT",
                match_id = 12345,
                player1 = "Haziel",
                player2 = "Ignacio",
                players = 2,
                player_1_ships = null,
                player_2_ships = null,
                player_1_history = 1,
                player_2_history = 1
            };
            mock.Setup(p => p.GetMatch(12345)).ReturnsAsync(testItem);
            MatchController matchT = new MatchController(mock.Object);
            //Act
            ObjectResult result = (ObjectResult)await matchT.GetMatch(12345);
            //Assert
            Assert.IsType<ApiModel.Match>(result.Value);
        }
        /// <summary>
        /// Prueba SearchMatch_InvalidIDPassed_ReturnsNull
        /// Hace una busqueda de un id que no encuentra, devuelve un objeto tipo Null
        /// </summary>
        [Fact]
        public async void SearchMatch_InvalidIDPassed_ReturnsNull()
        {
            //Arrange
            Mock<IMatch> mock = new Mock<IMatch>();
            var testMatch = new ApiModel.Match()
            {
                event_key = "CPIPOT",
                match_id = 12345,
                player1 = "Haziel",
                player2 = "Ignacio",
                players = 2,
                player_1_ships = null,
                player_2_ships = null,
                player_1_history = 1,
                player_2_history = 1
            };
            mock.Setup(p => p.GetMatch(12345)).ReturnsAsync(testMatch);
            MatchController matchT = new MatchController(mock.Object);
            //Act
            ObjectResult result = (ObjectResult)await matchT.GetMatch(54321);
            //Assert
            Assert.Null(result.Value);
        }
    }
}
