using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace TestApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardSearchController : ControllerBase
    {

        [HttpGet]
        public IEnumerable<CardSearch> Get()
        {
            List<CardSearch> result = new();
            SqlConnection conn = new SqlConnection("Server=localhost;Database=CollectorsArchive;Integrated Security=True;TrustServerCertificate=True;");
            using (conn)
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("AdvancedSearchBySet", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@GameID", "ygo");
                cmd.Parameters.AddWithValue("@SetName", "Battle of Chaos");

                SqlDataReader reader = cmd.ExecuteReader();

                while(reader.Read())
                {
                    result.Add(new CardSearch
                    {
                        CardID = reader.GetString(0),
                        CardName = reader.GetString(1),
                        SetCode = reader.GetString(2),
                        CardRarity = reader.GetString(3)
                    });
                }
            }

            return result;
        }
    }
}
