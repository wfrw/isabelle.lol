client.notify("executed successfully!")
client.notify("script made and updated by oqrnkk")

client.on_event("render", function()
    local bases = game:get_service("Workspace"):find_first_child("Bases")
    if not bases then return end

    local loners = bases:find_first_child("Loners")
    if not loners then return end

    for _, v in pairs(loners:get_children()) do
  
        local bodyBag = v:find_first_child("Body Bag")
        if bodyBag and bodyBag.address ~= 0 then
            local main = bodyBag:find_first_child("Main")
            if main and main.address ~= 0 then
                local visible, position = client.world_to_screen(main:get_position())
                if visible then
                    renderer.text(position, Color3.new(150, 150, 255), "Body Bag")
                end
            end
        end

        local sleeper = v:find_first_child("Sleeper")
        if sleeper and sleeper.address ~= 0 then
            local head = sleeper:find_first_child("Head")
            if head and head.address ~= 0 then
                local visible, position = client.world_to_screen(head:get_position())
                if visible then
                    renderer.text(position, Color3.new(255, 255, 255), "Sleeper")
                end
            end
        end
    end
end);
