package com.housesearchKE.property_owners_service.feign;

import com.housesearchKE.property_owners_service.dto.PropertiesDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient("properties-service")
public interface OwnersPropertiesInterface {
    @GetMapping("properties/owner/{id}")
    public ResponseEntity<List<String>> searchRentalsForOwner(@PathVariable("id") String id);

    @PostMapping("properties/owner")
    public ResponseEntity<List<PropertiesDTO>> returnRentalsForOwner(@RequestBody List<String> rentalIds);
}
