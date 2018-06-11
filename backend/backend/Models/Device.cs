using System;
using JsonApiDotNetCore.Models;

namespace backend.Models {

    public class Device: Identifiable<int> {
        
        [Attr("mac_address")]
        public string MacAddress { get; set; }

        [Attr("serial_number")]
        public string SerialNumber { get; set; }

        [Attr("device_status")]
        public string DeviceStatus { get; set; }

        [Attr("status")]
        public string Status { get; set; }

        [Attr("device_summary")]
        public string Summary { get; set; }

        [Attr("last_inform_at")]
        public DateTime LastInformAt { get; set; }

        [Attr("is_online")]
        public bool IsOnline { get; set; }

        [Attr("external_ip_address")]
        public string ExternalIpAddress { get; set; }


        public int CustomerId { get; set; }

        [HasOne("customer")]
        public virtual Customer Customer { get; set; }
    }
}