using System.Collections.Generic;

namespace API.Dtos
{
    public class ChartModel
{
    public List<int> Data { get; set; }
    public string Label { get; set; }

    public ChartModel()
    {
        Data = new List<int>();
    }
}
}