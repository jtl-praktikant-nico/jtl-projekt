using Microsoft.AspNetCore.Mvc;
using HardwarePlanetApi.Models;

namespace HardwarePlanetApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Das bedeutet die API ist unter /api/products erreichbar
    public class ProductsController : ControllerBase
    {
        
        private static readonly List<Product> Products = new()
        {
            new Product { Id = 1, Name = "NVIDIA RTX 5080", Category = "Grafikkarten", Price = 1199.99m, Description = "High-End Grafikkarte für flüssiges 4K-Gaming und Raytracing.", ImageUrl = "" },
            new Product { Id = 2, Name = "AMD Ryzen 9 9950X", Category = "Prozessoren", Price = 649.00m, Description = "16-Core High-Performance Prozessor für Gamer und Creator.", ImageUrl = "" },
            new Product { Id = 3, Name = "Hardware Planet Thermal Paste", Category = "Zubehör", Price = 9.95m, Description = "Premium Wärmeleitpaste für optimales Thermal Management und geringe Hotspots.", ImageUrl = "" } // muss noch bilder raussuchen
        };
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            return Ok(Products);
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProductById(int id)
        {
            var product = Products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public ActionResult<Product> CreateProduct(Product product)
        {
            if (string.IsNullOrWhiteSpace(product.Name))
            {
                return BadRequest("Das product muss einen Namen haben.");
            }
            var productCheck = Products.FirstOrDefault(p => p.Id == product.Id);
            if (productCheck != null)
            {
                return BadRequest("Ein Produkt mit dieser Id existiert bereits.");
            }
            Products.Add(product);
            return Ok(product);
        }
    }
}