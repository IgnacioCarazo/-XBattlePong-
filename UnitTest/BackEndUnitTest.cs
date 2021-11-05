using ApiData.Interfaces;
using ApiModel;
using Microsoft.AspNetCore.Mvc;
using NetCoreApiSQL.Controllers;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace UnitTest
{
    /// <summary>
    /// Clase utilizada para el desarrollo de pruebas Xunit
    /// </summary>
    /// 
    public class BackEndUnitTest
    {
        private readonly EventController _controllerEvent;
        private readonly MatchController _controllerMatch;
        private readonly IEvent _ievent;
        private readonly IMatch _imatch;
        private readonly ITestOutputHelper _output;
        /// <summary>
        /// Constructor que relaciona las interfaces con la clase falsa creada para pruebas e inicia los controladores
        /// </summary>
        /// <param name="output">Ayuda en a imprimir mensajes durante las pruebas</param>
        public BackEndUnitTest(ITestOutputHelper output)
        {
            _output = output;
            _ievent = new EventServiceFake();
            _imatch = new MatchServiceFake();
            _controllerEvent = new EventController(_ievent);
            _controllerMatch = new MatchController(_imatch);

        }
        /// <summary>
        /// Las pruebas suelen dividirlas en 3 pasos: arrange, act y assert
        /// Prueba 1: Enviar objeto evento null y esperar como respuesta un 'Bad Response'
        /// </summary>
        [Fact]
        public async Task CreateEvent_InvalidObjectPassed_ReturnsBadRequestAsync()
        {
            // Arrange
            Event nullEventItem = null;
            // Act
            var badResponse = await _controllerEvent.CreateEvent(nullEventItem);
               _output.WriteLine($"Bad Response is: {badResponse}");
            // Assert
            Assert.IsType<BadRequestResult>(badResponse);
        }
        /// <summary>
        /// Prueba 2: Enviar objeto evento valido y esperar como respuesta un 'Ok'     
        /// </summary>
        [Fact]
        public async Task CreateEvent_ValidObjectPassed_ReturnsCreatedResponseAsync()
        {
            //Arrange
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
            // Act
            var createdResponse =await _controllerEvent.CreateEvent(testItem);
            _output.WriteLine(createdResponse.ToString());
            // Assert
            Assert.IsType<OkObjectResult>(createdResponse);
        }
        /// <summary>
        /// Prueba 3: Enviar objeto partida null y esperar como respuesta un 'Bad Response'
        /// </summary>
        [Fact]
        public async Task CreateMatch_InvalidObjectPassed_ReturnsBadRequestAsync()
        {
            // Arrange
            Match nullMatchItem = null;
            // Act
            var badResponse = await _controllerMatch.CreateMatch(nullMatchItem);
            _output.WriteLine($"Bad Response is: {badResponse}");
            // Assert
            Assert.IsType<BadRequestResult>(badResponse);
        }
        /// <summary>
        /// Prueba 4: Enviar objeto partida valida y esperar como respuesta un 'Ok'     
        /// </summary>
        [Fact]
        public async Task CreateMatch_ValidObjectPassed_ReturnsCreatedResponseAsync()
        {
            // Arrange
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
            // Act
            var createdResponse = await _controllerMatch.CreateMatch(testItem);
            _output.WriteLine(createdResponse.ToString());
            // Assert
            Assert.IsType<OkObjectResult>(createdResponse);
        }
    }
}
