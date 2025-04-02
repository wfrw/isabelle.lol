client.notify("executed successfully!")
client.notify("script made and updated by oqrnkk")

client.on_event("render", function()
    for i, v in pairs(game:get_service("Workspace"):find_first_child("Plants"):get_children()) do
        if v.address ~= 0 then
			if v:find_first_child("Main").address ~= 0 then
                local Plant = v:find_first_child("Main")
                if Plant.address ~= 0 then
                    local visible, position = client.world_to_screen( Plant:get_position() );
                    renderer.text( position , Color3.new(0, 255, 0), v.name )
                end
            end
        end
    end
end);
