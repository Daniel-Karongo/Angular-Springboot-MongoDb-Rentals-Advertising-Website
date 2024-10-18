package com.housesearchKE.properties_service.feign;

import com.housesearchKE.properties_service.model.PropertyOwner;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@FeignClient("property-owners-service")
public interface PropertiesOwnersInterface {
    @GetMapping("owners/")
    public ResponseEntity<List<PropertyOwner>> getAllPropertyOwners();

    @GetMapping("owners/owner/{id}")
    public ResponseEntity<Optional<PropertyOwner>> getPropertyOwner(@PathVariable("id") String id);

    @PostMapping("owners/owner")
    public ResponseEntity<PropertyOwner> savePropertyOwner(@RequestBody PropertyOwner owner);

    @PostMapping ("owners/owners")
    public ResponseEntity<List<PropertyOwner>> savePropertyOwners(@RequestBody List<PropertyOwner> owners);
}
