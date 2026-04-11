using Microsoft.AspNetCore.Mvc;
using WeddingPlanner.Models;
using WeddingPlanner.Services;

namespace WeddingPlanner.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : ControllerBase
    {
        private readonly DistributionService _distributionService;

        public CalculatorController(DistributionService distributionService)
        {
            _distributionService = distributionService;
        }

        /// <summary>
        /// Calcula a distribuição do orçamento do casamento
        /// </summary>
        /// <param name="request">Dados da requisição com orçamento e serviços</param>
        /// <returns>Distribuição calculada</returns>
        [HttpPost("calculate")]
        public ActionResult<DistributionResult> Calculate([FromBody] DistributionRequest request)
        {
            // Validação básica
            if (request == null)
                return BadRequest(new { message = "Request inválido." });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = _distributionService.Calculate(request);

                if (result == null)
                    return BadRequest(new { message = "Não foi possível calcular a distribuição." });

                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                // Erros de regra de negócio
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
            catch (Exception)
            {
                // Erro inesperado (não expõe detalhes sensíveis)
                return StatusCode(500, new
                {
                    message = "Erro interno ao processar a requisição."
                });
            }
        }

        /// <summary>
        /// Endpoint simples para verificar se a API está online
        /// </summary>
        [HttpGet("health")]
        public IActionResult Health()
        {
            return Ok(new
            {
                status = "API funcionando",
                timestamp = DateTime.UtcNow
            });
        }
    }
}